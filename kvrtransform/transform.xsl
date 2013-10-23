<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema">
	<xsl:template match="/">
		<add>
			<doc>
				<field name="id"><xsl:value-of select="//item[@attribuut='Document-id']/text()" /></field>
				<field name="permalink"><xsl:value-of select="//item[@attribuut='Permalink']/text()" /></field>
				<field name="summary"><xsl:value-of select="//item[@attribuut='Inhoud']/text()" /></field>
				<field name="year"><xsl:value-of select="year-from-date(xs:date(//item[@attribuut='Datum_indiening']/text()))" /></field>

				<xsl:for-each select="distinct-values(kvr/meta/vraagdata/vrager/@partij)">
					<field name="parties"><xsl:value-of select="."/></field>
				</xsl:for-each>
				<xsl:for-each select="kvr/vragen/vraag">
					<field name="questions"><xsl:value-of select="string-join(text(), ' ')" /></field>
				</xsl:for-each>
				<xsl:for-each select="kvr/antwoorden/antwoord">
					<field name="answers"><xsl:value-of select="string-join(text(), ' ')" /></field>
				</xsl:for-each>
				<field name="fullText"><xsl:value-of select="string-join(*|@*/text(), ' ')"/></field>
			</doc>
		</add>	
	</xsl:template>
</xsl:stylesheet>

